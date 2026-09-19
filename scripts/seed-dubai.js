/*
 * Seed sample Dubai data so the site shows content end-to-end.
 * Inserts: cities (Dubai areas), boards, school types, classifications,
 * facilities, and a few sample published schools (each with its slug doc).
 *
 * Usage (inside the server folder):
 *   node scripts/seed-dubai.js
 * MONGO_URI is read from server/.env (same as create-admin.js) or inline:
 *   MONGO_URI="mongodb+srv://..." node scripts/seed-dubai.js
 *
 * Idempotent: re-running won't create duplicates.
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

(function loadEnv() {
  try {
    const txt = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined)
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch (e) {}
})();

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("MONGO_URI not set (add it to server/.env or pass inline).");
    process.exit(1);
  }
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  const now = new Date();
  const col = (n) => db.collection(n);

  async function upsert(collection, filter, doc) {
    await col(collection).updateOne(
      filter,
      { $setOnInsert: { ...doc, createdAt: now, updatedAt: now, __v: 0 } },
      { upsert: true }
    );
    return (await col(collection).findOne(filter))._id;
  }

  // ---------- Cities (Dubai areas) ----------
  const AREAS = [
    ["Downtown Dubai", true],
    ["Dubai Marina", true],
    ["Jumeirah", true],
    ["Al Barsha", true],
    ["Emirates Hills", false],
    ["Al Sufouh", false],
    ["Nad Al Sheba", false],
    ["Al Quoz", false],
    ["Palm Jumeirah", true],
  ];
  const city = {};
  for (const [name, pop] of AREAS) {
    city[name] = await upsert(
      "cities",
      { city: name },
      {
        country: "United Arab Emirates",
        state: "Dubai",
        city: name,
        icon: "city",
        slug: slugify(name),
        isPopularCity: pop,
      }
    );
  }

  // ---------- Boards / Types / Classifications ----------
  const board = {};
  for (const n of ["British", "American", "IB", "CBSE", "ICSE", "IGCSE"])
    board[n] = await upsert("school-boards", { name: n }, { name: n });

  const type = {};
  for (const n of ["Day School", "Boarding School", "Day Boarding", "Play School", "Residential School"])
    type[n] = await upsert("school-types", { name: n }, { name: n });

  const cls = {};
  for (const n of ["Premium", "Standard", "Budget Friendly"])
    cls[n] = await upsert("school-classifications", { name: n }, { name: n });

  // ---------- Facilities (icon required) ----------
  const fac = {};
  for (const n of ["Swimming Pool", "Transport", "Sports", "Library", "Lab", "Smart Classes", "Medical", "Cafeteria", "Playground", "Hostel"])
    fac[n] = await upsert("facilities", { name: n }, { name: n, icon: "facility" });

  // ---------- Sample schools ----------
  const F = (...names) => names.map((n) => fac[n]);
  const SCHOOLS = [
    { name: "GEMS Wellington International School", area: "Al Sufouh", board: "British", type: "Day School", cls: "Premium", from: "FS1", to: "Year 13", min: 60000, max: 95000, rating: 4.8, featured: true, facilities: F("Swimming Pool","Sports","Library","Lab","Smart Classes","Medical","Transport"), year: 2007 },
    { name: "Dubai International Academy", area: "Emirates Hills", board: "IB", type: "Day School", cls: "Premium", from: "FS1", to: "Year 13", min: 55000, max: 90000, rating: 4.7, featured: true, facilities: F("Sports","Library","Lab","Smart Classes","Transport"), year: 2005 },
    { name: "Jumeirah English Speaking School", area: "Jumeirah", board: "British", type: "Day School", cls: "Premium", from: "FS1", to: "Year 13", min: 50000, max: 85000, rating: 4.6, featured: false, facilities: F("Sports","Library","Lab","Medical"), year: 1975 },
    { name: "American School of Dubai", area: "Al Barsha", board: "American", type: "Day School", cls: "Premium", from: "KG", to: "Grade 12", min: 65000, max: 98000, rating: 4.5, featured: false, facilities: F("Swimming Pool","Sports","Library","Smart Classes","Transport"), year: 1966 },
    { name: "Delhi Private School Dubai", area: "Al Quoz", board: "CBSE", type: "Day School", cls: "Standard", from: "KG", to: "Grade 12", min: 15000, max: 30000, rating: 4.5, featured: false, facilities: F("Transport","Sports","Library","Lab","Smart Classes"), year: 2003 },
    { name: "GEMS Modern Academy", area: "Nad Al Sheba", board: "CBSE", type: "Day School", cls: "Premium", from: "KG", to: "Grade 12", min: 25000, max: 45000, rating: 4.6, featured: true, facilities: F("Swimming Pool","Sports","Library","Lab","Smart Classes","Medical","Transport"), year: 1986 },
    { name: "Repton School Dubai", area: "Nad Al Sheba", board: "British", type: "Day Boarding", cls: "Premium", from: "FS1", to: "Year 13", min: 60000, max: 92000, rating: 4.7, featured: false, facilities: F("Hostel","Swimming Pool","Sports","Library","Lab","Medical"), year: 2007 },
  ];

  let created = 0;
  for (const s of SCHOOLS) {
    const slug = slugify(s.name);
    if (await col("schools").findOne({ slug })) continue;
    const res = await col("schools").insertOne({
      name: s.name,
      chairman: "The Principal",
      medium: "English",
      admissionStart: "2026-01-05",
      admissionEnd: "2026-06-30",
      contactNumber: "+971-4-000-0000",
      mail: "info@educationportal.ae",
      website: "https://educationportal.ae",
      about: `${s.name} is a leading ${s.board} curriculum school in ${s.area}, Dubai, offering quality education from ${s.from} to ${s.to}. Known for strong academics, modern facilities and a nurturing environment for every child.`,
      classFrom: s.from,
      classTo: s.to,
      classification: cls[s.cls],
      city: city[s.area],
      slug,
      images: [],
      schoolBoards: [board[s.board]],
      type: [type[s.type]],
      facilities: s.facilities,
      establishmentYear: s.year,
      minFees: s.min,
      maxFees: s.max,
      avgRating: s.rating,
      avgAcademicsRating: s.rating,
      avgAddmissionRating: s.rating,
      avgExtracurriclarRating: s.rating,
      avgInfrastructureRating: s.rating,
      isFeatured: s.featured,
      published: true,
      createdAt: now,
      updatedAt: now,
      __v: 0,
    });
    await col("slugs").updateOne(
      { slug },
      {
        $setOnInsert: {
          slug,
          formattedText: "",
          slugMetaData: {},
          slugJsonSchema: "",
          isHomepageSlug: false,
          filters: { school: res.insertedId },
          slugContent: "",
          heroTitle: "",
          heroSubtitle: "",
          heroImage: "",
          faqs: [],
          author: null,
          slugType: "individual",
          createdAt: now,
          updatedAt: now,
          __v: 0,
        },
      },
      { upsert: true }
    );
    created++;
  }

  const count = async (c) => col(c).countDocuments();
  console.log("Seed complete:");
  console.log("  cities:", await count("cities"));
  console.log("  boards:", await count("school-boards"));
  console.log("  types:", await count("school-types"));
  console.log("  classifications:", await count("school-classifications"));
  console.log("  facilities:", await count("facilities"));
  console.log("  schools:", await count("schools"), `(+${created} new)`);
  await mongoose.disconnect();
  console.log("Done. Refresh the webapp — Dubai schools should now appear.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
