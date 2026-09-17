import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables } from './env';
import { set } from 'mongoose';

// enable Global getters(including virtuals) for mongoose
set('toJSON', { getters: true });
set('toObject', { getters: true });

export default MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        uri: configService.get('MONGO_URI'),
    }),
    inject: [ConfigService],
});
