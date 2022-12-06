import dotenv from 'dotenv';

dotenv.config();
export const HA_TOKEN = process.env.HA_TOKEN || '';
export const BASE_HA_URL = process.env.BASE_HA_URL || '';
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';
export const ALARM_CODE = process.env.ALARM_CODE || '';

export const lightKeywords = ['light', 'group'];
