/* =========================================================
   PAINEL NEXA WEB — Configuração
   Único arquivo que você edita neste repositório.
   ========================================================= */

window.NEXA_CONFIG = {

  /* ---------------------------------------------------------
     SUPABASE

     Onde achar: app.supabase.com → seu projeto →
     Settings → API → "Project URL" e "anon public".

     Use exatamente o MESMO projeto do formulário de
     agendamento — é assim que os dois conversam.

     A chave anon é pública de propósito: quem protege os
     dados são as políticas de RLS, não o segredo da chave.
     NUNCA cole aqui a service_role.
     --------------------------------------------------------- */
  supabase: {
    url:     'https://dcikmlblvpayzmnfqznq.supabase.co',
    anonKey: 'sb_publishable_ZgLfnx_kYuEwhY-uVayUMA_ToUej3ig',
    tabela:  'briefings',
    bucket:  'briefings'
  },

  /* E-mail que já vem preenchido na tela de login */
  adminEmail: ''
};
