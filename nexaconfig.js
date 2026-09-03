/* =========================================================
   NEXA WEB — Configuração
   Único arquivo que você precisa editar.
   ========================================================= */

window.NEXA_CONFIG = {

  /* Seu WhatsApp, com código do país e DDD, só números */
  whatsapp: '5585997119151',

  /* Link do site principal */
  site: 'https://enzokaleb01.github.io/Site-Nexa-Web/',

  /* ---------------------------------------------------------
     SUPABASE

     Onde achar: app.supabase.com → seu projeto →
     Settings → API → "Project URL" e "anon public".

     A chave anon é pública de propósito: quem protege os
     dados são as políticas de RLS, não o segredo da chave.
     NUNCA cole aqui a service_role.

     Enquanto estiver com "COLE_AQUI", o painel fica desligado
     e o formulário continua funcionando pelo WhatsApp.
     --------------------------------------------------------- */
  supabase: {
    url:     'COLE_AQUI',
    anonKey: 'COLE_AQUI',
    tabela:  'briefings',
    bucket:  'briefings'
  },

  /* E-mail que já vem preenchido na tela de login do painel */
  adminEmail: 'seu@email.com'
};
