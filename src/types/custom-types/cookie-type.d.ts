import { COOKIE_KEY } from "src/@core/hocs/with-auth";

export type CookieType = Partial<Record<keyof typeof COOKIE_KEY, string>>
