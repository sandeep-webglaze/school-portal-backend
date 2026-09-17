export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum SORTING_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}

export enum NODE_ENVIRONMENT {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum SLUG_TYPE {
  COMBINATION = 'combination',
  INDIVIDUAL = 'individual',
}

export enum FILE_TYPE {
  PROFILE = 'user-images',
  ICON = 'icons',
  SCHOOL = 'school-images',
  SEO_IMAGES = 'seo-images',
  NEW_SCHOOL_IMAGES = 'new-school-images',
}

export enum USER_ROLE {
  ADMIN = 'admin',
  SUB_ADMIN = 'sub-admin',
  SCHOOL_ADMIN = 'school-admin',
  USER = 'user',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  BLOCK = 'block',
}

export enum USER_VERIFICATION_STATUS {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum OTP_TYPES {
  MOBILE = 'mobile',
  EMAIL = 'email',
  BOTH = 'mobile-email',
}

export enum OTP_STATUS {
  CREATED = 'created',
  PENDING = 'pending',
  FAILURE = 'failure',
  SUCCESS = 'success',
}

export enum SCHOOL_CLASSIFICATION {
  CO_ED = 'coed',
  GIRLS = 'girls',
  BOYS = 'boys',
}

export enum SCHOOL_BOARD {
  CBSE = 'cbse',
  ICSE_ISC = 'icse-isc',
  IB = 'ib',
  IGCSE = 'igcse',
  OTHER = 'other',
}

export enum SCHOOL_TYPE {
  DAY = 'day',
  BOARDING = 'boarding',
  BOTH = 'day boarding',
}

export enum SCHOOL_REQUEST_STATUS {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export enum SCHOOL_ENQUIRY_STATUS {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export enum WALLET_PAYMENT_TYPE {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TRANSACTION_TYPE {
  CREDIT = 'credit',
  DEBIT = 'debit',
  PURCHASE = 'purchase_leads',
}

export enum TRANSACTION_STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

export enum PROPERTY_PAYMENT_METHOD {
  RAZORPAY = 'razorpay',
}

export enum PLATFORMS {
  SOD = 'SOD',
  EDHIPPO = 'EDHIPPO',
  EDHIPPO_APP = 'EDHIPPO_APP',
}
