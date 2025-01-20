import { createClient } from '@supabase/supabase-js';
import type { Session } from '@shopify/shopify-api';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface DbSession extends Session {
  id: string;
  shop: string;
  state: string;
  isOnline: boolean;
  scope?: string;
  expires?: Date;
  accessToken: string;
  userId?: string;
  onlineAccessInfo?: {
    associated_user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      account_owner: boolean;
      locale: string;
      collaborator: boolean;
      email_verified: boolean;
    };
  };
}

export const sessionStorage = {
  storeSession: async (session: Session) => {
    const { error } = await supabase
      .from('sessions')
      .upsert({
        id: session.id,
        shop: session.shop,
        state: session.state,
        isOnline: session.isOnline,
        scope: session.scope,
        expires: session.expires,
        accessToken: session.accessToken,
        userId: session.onlineAccessInfo?.associated_user?.id?.toString(),
        onlineAccessInfo: session.onlineAccessInfo
      });

    if (error) throw error;
    return true;
  },

  loadSession: async (id: string): Promise<Session | undefined> => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return data as Session;
  },

  deleteSession: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  deleteSessions: async (shop: string): Promise<boolean> => {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('shop', shop);

    if (error) throw error;
    return true;
  },

  findSessionsByShop: async (shop: string): Promise<Session[]> => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('shop', shop);

    if (error) throw error;
    return data as Session[];
  }
};

export default supabase;
