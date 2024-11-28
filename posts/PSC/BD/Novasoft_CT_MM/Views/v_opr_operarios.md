# View: v_opr_operarios

## Usa los objetos:
- [[inv_item_cargos]]
- [[opr_horarios]]
- [[opr_operarios]]
- [[opr_secuencias]]
- [[rhh_emplea]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)ALTER VIEW [dbo].[v_opr_operarios]
CREATE VIEW [dbo].[v_opr_operarios]
AS

SELECT        dbo.rhh_emplea.cod_emp, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, dbo.rhh_emplea.nom1_emp, dbo.rhh_emplea.nom2_emp, dbo.rhh_emplea.nom_emp, dbo.rhh_emplea.fec_nac, dbo.rhh_emplea.cod_pai, 
                         dbo.rhh_emplea.num_ide, dbo.rhh_emplea.cod_dep, dbo.rhh_emplea.cod_ciu, dbo.rhh_emplea.tip_ide, dbo.rhh_emplea.pai_exp, dbo.rhh_emplea.ciu_exp, dbo.rhh_emplea.num_lib, dbo.rhh_emplea.cod_reloj, 
                         dbo.rhh_emplea.cla_lib, dbo.rhh_emplea.dim_lib, dbo.rhh_emplea.sex_emp, dbo.rhh_emplea.gru_san, dbo.rhh_emplea.est_civ, dbo.rhh_emplea.fac_rhh, dbo.rhh_emplea.fto_emp, dbo.rhh_emplea.nac_emp, 
                         dbo.rhh_emplea.dir_res, dbo.rhh_emplea.tel_res, dbo.rhh_emplea.dpt_res, dbo.rhh_emplea.pai_res, dbo.rhh_emplea.ciu_res, dbo.rhh_emplea.dpt_exp, dbo.rhh_emplea.per_car, dbo.rhh_emplea.cod_car, 
                         dbo.rhh_emplea.avi_emp, dbo.opr_operarios.tip_opr, dbo.rhh_emplea.tam_emp, dbo.rhh_emplea.login_portal, dbo.rhh_emplea.pes_emp, dbo.rhh_emplea.barrio, dbo.rhh_emplea.e_mail, dbo.rhh_emplea.e_mail_alt, 
                         dbo.rhh_emplea.tel_cel, dbo.opr_operarios.cod_sec, sec.cod_sec AS Expr1, sec.descrip, CASE h1.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h1.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 
                         1), SUM(h1.h_ini1 + h1.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h1.h_ini1 + h1.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h1.h_ini1 + h1.dur_1)) END) 
                         + CASE h1.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h1.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h1.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h1.h_ini2 + h1.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h1.h_ini2 + h1.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h1.h_ini2 + h1.dur_2)) END) END END END AS D1, CASE h2.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, 
                         h2.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h2.h_ini1 + h2.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h2.h_ini1 + h2.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h2.h_ini1 + h2.dur_1)) END) + CASE h2.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h2.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h2.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h2.h_ini2 + h2.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h2.h_ini2 + h2.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h2.h_ini2 + h2.dur_2)) END) END END END AS D2, 
                         CASE h3.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h3.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h3.h_ini1 + h3.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h3.h_ini1 + h3.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h3.h_ini1 + h3.dur_1)) END) + CASE h3.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h3.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h3.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h3.h_ini2 + h3.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h3.h_ini2 + h3.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h3.h_ini2 + h3.dur_2)) 
                         END) END END END AS D3, CASE h4.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h4.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h4.h_ini1 + h4.dur_1)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h4.h_ini1 + h4.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h4.h_ini1 + h4.dur_1)) END) 
                         + CASE h4.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h4.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h4.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h4.h_ini2 + h4.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h4.h_ini2 + h4.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h4.h_ini2 + h4.dur_2)) END) END END END AS D4, CASE h5.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, 
                         h5.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h5.h_ini1 + h5.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h5.h_ini1 + h5.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h5.h_ini1 + h5.dur_1)) END) + CASE h5.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h5.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h5.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h5.h_ini2 + h5.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h5.h_ini2 + h5.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h5.h_ini2 + h5.dur_2)) END) END END END AS D5, 
                         CASE h6.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h6.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h6.h_ini1 + h6.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h6.h_ini1 + h6.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h6.h_ini1 + h6.dur_1)) END) + CASE h6.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h6.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h6.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h6.h_ini2 + h6.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h6.h_ini2 + h6.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h6.h_ini2 + h6.dur_2)) 
                         END) END END END AS D6, CASE h7.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h7.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h7.h_ini1 + h7.dur_1)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h7.h_ini1 + h7.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h7.h_ini1 + h7.dur_1)) END) 
                         + CASE h7.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h7.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h7.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h7.h_ini2 + h7.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h7.h_ini2 + h7.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h7.h_ini2 + h7.dur_2)) END) END END END AS D7, CASE h8.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, 
                         h8.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h8.h_ini1 + h8.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h8.h_ini1 + h8.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h8.h_ini1 + h8.dur_1)) END) + CASE h8.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h8.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h8.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h8.h_ini2 + h8.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h8.h_ini2 + h8.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h8.h_ini2 + h8.dur_2)) END) END END END AS D8, 
                         CASE h9.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h9.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h9.h_ini1 + h9.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h9.h_ini1 + h9.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h9.h_ini1 + h9.dur_1)) END) + CASE h9.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h9.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h9.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h9.h_ini2 + h9.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h9.h_ini2 + h9.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h9.h_ini2 + h9.dur_2)) 
                         END) END END END AS D9, CASE h10.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h10.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h10.h_ini1 + h10.dur_1)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h10.h_ini1 + h10.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h10.h_ini1 + h10.dur_1)) END) 
                         + CASE h10.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h10.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h10.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h10.h_ini2 + h10.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h10.h_ini2 + h10.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h10.h_ini2 + h10.dur_2)) END) END END END AS D10, CASE h11.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h11.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h11.h_ini1 + h11.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h11.h_ini1 + h11.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h11.h_ini1 + h11.dur_1)) END) + CASE h11.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h11.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h11.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h11.h_ini2 + h11.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h11.h_ini2 + h11.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h11.h_ini2 + h11.dur_2)) END) END END END AS D11, 
                         CASE h12.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h12.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h12.h_ini1 + h12.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h12.h_ini1 + h12.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h12.h_ini1 + h12.dur_1)) END) + CASE h12.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h12.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h12.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h12.h_ini2 + h11.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h12.h_ini2 + h12.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h12.h_ini2 + h12.dur_2)) END) END END END AS D12, CASE h13.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h13.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h13.h_ini1 + h13.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h13.h_ini1 + h13.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h13.h_ini1 + h13.dur_1)) END) 
                         + CASE h13.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h13.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h13.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h13.h_ini2 + h13.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h13.h_ini2 + h13.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h13.h_ini2 + h13.dur_2)) END) END END END AS D13, CASE h14.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h14.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h14.h_ini1 + h14.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h14.h_ini1 + h14.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h14.h_ini1 + h14.dur_1)) END) + CASE h14.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h14.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h14.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h14.h_ini2 + h14.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h14.h_ini2 + h14.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h14.h_ini2 + h14.dur_2)) END) END END END AS D14, 
                         CASE h15.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h15.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h15.h_ini1 + h15.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h15.h_ini1 + h15.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h15.h_ini1 + h15.dur_1)) END) + CASE h15.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h15.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h15.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h15.h_ini2 + h15.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h15.h_ini2 + h15.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h15.h_ini2 + h15.dur_2)) END) END END END AS D15, CASE H16.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h16.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h16.h_ini1 + h16.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h16.h_ini1 + h16.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h16.h_ini1 + h16.dur_1)) END) 
                         + CASE h16.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h16.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h16.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h16.h_ini2 + h16.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h16.h_ini2 + h16.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h16.h_ini2 + h16.dur_2)) END) END END END AS D16, CASE h17.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h17.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h17.h_ini1 + h17.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h17.h_ini1 + h17.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h17.h_ini1 + h17.dur_1)) END) + CASE h17.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h17.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h17.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h17.h_ini2 + h17.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h17.h_ini2 + h17.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h17.h_ini2 + h17.dur_2)) END) END END END AS D17, 
                         CASE h18.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h18.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h18.h_ini1 + h18.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h18.h_ini1 + h18.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h18.h_ini1 + h18.dur_1)) END) + CASE h18.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h18.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h18.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h18.h_ini2 + h18.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h18.h_ini2 + h18.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h18.h_ini2 + h18.dur_2)) END) END END END AS D18, CASE h19.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h19.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h19.h_ini1 + h19.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h19.h_ini1 + h19.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h19.h_ini1 + h19.dur_1)) END) 
                         + CASE h19.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h19.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h19.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h19.h_ini2 + h19.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h19.h_ini2 + h19.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h19.h_ini2 + h19.dur_2)) END) END END END AS D19, CASE h20.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h20.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h20.h_ini1 + h20.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h20.h_ini1 + h20.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h20.h_ini1 + h20.dur_1)) END) + CASE h20.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h20.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h20.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h20.h_ini2 + h20.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h20.h_ini2 + h20.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h20.h_ini2 + h20.dur_2)) END) END END END AS D20, 
                         CASE h21.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h21.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h21.h_ini1 + h21.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h21.h_ini1 + h21.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h21.h_ini1 + h21.dur_1)) END) + CASE h21.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h21.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h21.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h21.h_ini2 + h21.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h21.h_ini2 + h21.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h21.h_ini2 + h21.dur_2)) END) END END END AS D21, CASE h22.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h22.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h22.h_ini1 + h22.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h22.h_ini1 + h22.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h22.h_ini1 + h22.dur_1)) END) 
                         + CASE h22.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h22.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h22.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h22.h_ini2 + h22.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h22.h_ini2 + h22.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h22.h_ini2 + h22.dur_2)) END) END END END AS D22, CASE h23.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h23.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h23.h_ini1 + h23.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h23.h_ini1 + h23.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h23.h_ini1 + h23.dur_1)) END) + CASE h23.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h23.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h23.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h23.h_ini2 + h23.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h23.h_ini2 + h23.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h23.h_ini2 + h23.dur_2)) END) END END END AS D23, 
                         CASE h24.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h24.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h24.h_ini1 + h24.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h24.h_ini1 + h24.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h24.h_ini1 + h24.dur_1)) END) + CASE h24.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h24.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h24.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h24.h_ini2 + h24.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h24.h_ini2 + h24.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h24.h_ini2 + h24.dur_2)) END) END END END AS D24, CASE h25.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h25.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h25.h_ini1 + h25.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h25.h_ini1 + h25.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h25.h_ini1 + h25.dur_1)) END) 
                         + CASE h25.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h25.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h25.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h25.h_ini2 + h25.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h25.h_ini2 + h25.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h25.h_ini2 + h25.dur_2)) END) END END END AS D25, CASE h26.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h26.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h26.h_ini1 + h26.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h26.h_ini1 + h26.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h26.h_ini1 + h26.dur_1)) END) + CASE h26.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h26.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h26.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h26.h_ini2 + h26.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h26.h_ini2 + h26.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h26.h_ini2 + h26.dur_2)) END) END END END AS D26, 
                         CASE h27.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h27.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h27.h_ini1 + h27.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h27.h_ini1 + h27.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h27.h_ini1 + h27.dur_1)) END) + CASE h27.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h27.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h27.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h27.h_ini2 + h27.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h27.h_ini2 + h27.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h27.h_ini2 + h27.dur_2)) END) END END END AS D27, CASE h28.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h28.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h28.h_ini1 + h28.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h28.h_ini1 + h28.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h28.h_ini1 + h28.dur_1)) END) 
                         + CASE h28.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h28.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h28.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h28.h_ini2 + h28.dur_2)) 
                         > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h28.h_ini2 + h28.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h28.h_ini2 + h28.dur_2)) END) END END END AS D28, CASE h29.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR,
                          h29.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h29.h_ini1 + h29.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h29.h_ini1 + h29.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h29.h_ini1 + h29.dur_1)) END) + CASE h29.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h29.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h29.h_ini2) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), 
                         SUM(h29.h_ini2 + h29.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h29.h_ini2 + h29.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h29.h_ini2 + h29.dur_2)) END) END END END AS D29, 
                         CASE h30.cod_hor WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h30.h_ini1) + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h30.h_ini1 + h30.dur_1)) > 24 THEN CONVERT(DECIMAL(4, 1), 
                         SUM(h30.h_ini1 + h30.dur_1)) - 24 ELSE CONVERT(DECIMAL(4, 1), SUM(h30.h_ini1 + h30.dur_1)) END) + CASE h30.h_ini2 WHEN '0' THEN '' ELSE '*' + CASE h30.h_ini2 WHEN '0' THEN '' ELSE CONVERT(VARCHAR, h30.h_ini2) 
                         + '-' + CONVERT(VARCHAR, CASE WHEN CONVERT(DECIMAL(4, 1), SUM(h30.h_ini2 + h30.dur_2)) > 24 THEN CONVERT(DECIMAL(4, 1), SUM(h30.h_ini2 + h30.dur_2)) - 24 ELSE CONVERT(DECIMAL(4, 1), 
                         SUM(h30.h_ini2 + h30.dur_2)) END) END END END AS D30, dbo.rhh_emplea.est_lab AS estado_laboral, dbo.opr_operarios.est_lab AS estado_operaciones, dbo.opr_operarios.mod_pago,dbo.opr_operarios.cod_zon as zona,
						 dbo.opr_operarios.cod_cas,opr_operarios.cat_tur,opr_operarios.cat_vfi,opr_operarios.cat_hor,opr_operarios.ind_rno,dbo.rhh_emplea.fec_ing, opr_operarios.ind_rdo, opr_operarios.ind_rfe,dbo.rhh_emplea.cod_cco,
						 dbo.opr_operarios.cod_cli,opr_operarios.sit_cli,opr_operarios.dia_sec
FROM					 dbo.rhh_emplea WITH (NOLOCK)  LEFT OUTER JOIN
                         dbo.opr_operarios WITH (NOLOCK)  ON dbo.rhh_emplea.cod_emp = dbo.opr_operarios.cod_emp LEFT OUTER JOIN
                         dbo.opr_secuencias AS sec WITH (NOLOCK)  ON dbo.opr_operarios.cod_sec = sec.cod_sec LEFT OUTER JOIN
                         dbo.opr_horarios   AS h1 WITH (NOLOCK)  ON sec.dia_01 = h1.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h2 WITH (NOLOCK)  ON sec.dia_02 = h2.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h3 WITH (NOLOCK)  ON sec.dia_03 = h3.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h4 WITH (NOLOCK)  ON sec.dia_04 = h4.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h5 WITH (NOLOCK)  ON sec.dia_05 = h5.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h6 WITH (NOLOCK)  ON sec.dia_06 = h6.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h7 WITH (NOLOCK)  ON sec.dia_07 = h7.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h8 WITH (NOLOCK)  ON sec.dia_08 = h8.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h9 WITH (NOLOCK)  ON sec.dia_09 = h9.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h10 WITH (NOLOCK)  ON sec.dia_10 = h10.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h11 WITH (NOLOCK)  ON sec.dia_11 = h11.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h12 WITH (NOLOCK)  ON sec.dia_12 = h12.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h13 WITH (NOLOCK)  ON sec.dia_13 = h13.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h14 WITH (NOLOCK)  ON sec.dia_14 = h14.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h15 WITH (NOLOCK)  ON sec.dia_15 = h15.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h16 WITH (NOLOCK)  ON sec.dia_16 = h16.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h17 WITH (NOLOCK)  ON sec.dia_17 = h17.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h18 WITH (NOLOCK)  ON sec.dia_18 = h18.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h19 WITH (NOLOCK)  ON sec.dia_19 = h19.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h20 WITH (NOLOCK)  ON sec.dia_20 = h20.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h21 WITH (NOLOCK)  ON sec.dia_21 = h21.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h22 WITH (NOLOCK)  ON sec.dia_22 = h22.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h23 WITH (NOLOCK)  ON sec.dia_23 = h23.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h24 WITH (NOLOCK)  ON sec.dia_24 = h24.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h25 WITH (NOLOCK)  ON sec.dia_25 = h25.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h26 WITH (NOLOCK)  ON sec.dia_26 = h26.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h27 WITH (NOLOCK)  ON sec.dia_27 = h27.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h28 WITH (NOLOCK)  ON sec.dia_28 = h28.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h29 WITH (NOLOCK)  ON sec.dia_29 = h29.cod_hor LEFT OUTER JOIN
                         dbo.opr_horarios AS h30 WITH (NOLOCK)  ON sec.dia_30 = h30.cod_hor AND dbo.rhh_emplea.cod_car IN
                             (SELECT        cod_car
                               FROM            dbo.inv_item_cargos WITH (NOLOCK)
                               WHERE        (cod_car <> '0')
                               GROUP BY cod_car)
GROUP BY sec.cod_sec, sec.descrip, h1.h_ini1, h2.h_ini1, h3.h_ini1, h4.h_ini1, h5.h_ini1, h6.h_ini1, h7.h_ini1, h8.h_ini1, h9.h_ini1, h10.h_ini1, h11.h_ini1, h12.h_ini1, h13.h_ini1, h14.h_ini1, h15.h_ini1, h16.h_ini1, h17.h_ini1, h18.h_ini1, 
                         h19.h_ini1, h20.h_ini1, h21.h_ini1, h22.h_ini1, h23.h_ini1, h24.h_ini1, h25.h_ini1, h26.h_ini1, h27.h_ini1, h28.h_ini1, h29.h_ini1, h30.h_ini1, h1.cod_hor, h2.cod_hor, h3.cod_hor, h4.cod_hor, h5.cod_hor, h6.cod_hor, h7.cod_hor, 
                         h8.cod_hor, h9.cod_hor, h10.cod_hor, h11.cod_hor, h12.cod_hor, h13.cod_hor, h14.cod_hor, h15.cod_hor, h16.cod_hor, h17.cod_hor, h18.cod_hor, h19.cod_hor, h20.cod_hor, h21.cod_hor, h22.cod_hor, h23.cod_hor, 
                         h24.cod_hor, h25.cod_hor, h26.cod_hor, h27.cod_hor, h28.cod_hor, h29.cod_hor, h30.cod_hor, h1.h_ini2, h2.h_ini2, h3.h_ini2, h4.h_ini2, h5.h_ini2, h6.h_ini2, h7.h_ini2, h8.h_ini2, h9.h_ini2, h10.h_ini2, h11.h_ini2, h12.h_ini2, 
                         h13.h_ini2, h14.h_ini2, h15.h_ini2, h16.h_ini2, h17.h_ini2, h18.h_ini2, h19.h_ini2, h20.h_ini2, h21.h_ini2, h22.h_ini2, h23.h_ini2, h24.h_ini2, h25.h_ini2, h26.h_ini2, h27.h_ini2, h28.h_ini2, h29.h_ini2, h30.h_ini2, 
                         dbo.rhh_emplea.cod_emp, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, dbo.rhh_emplea.nom1_emp, dbo.rhh_emplea.nom2_emp, dbo.rhh_emplea.nom_emp, dbo.rhh_emplea.fec_nac, dbo.rhh_emplea.cod_pai, 
                         dbo.rhh_emplea.num_ide, dbo.rhh_emplea.cod_dep, dbo.rhh_emplea.cod_ciu, dbo.rhh_emplea.tip_ide, dbo.rhh_emplea.pai_exp, dbo.rhh_emplea.ciu_exp, dbo.rhh_emplea.num_lib, dbo.rhh_emplea.cod_reloj, 
                         dbo.rhh_emplea.cla_lib, dbo.rhh_emplea.dim_lib, dbo.rhh_emplea.sex_emp, dbo.rhh_emplea.gru_san, dbo.rhh_emplea.est_civ, dbo.rhh_emplea.fac_rhh, dbo.rhh_emplea.fto_emp, dbo.rhh_emplea.nac_emp, 
                         dbo.rhh_emplea.dir_res, dbo.rhh_emplea.tel_res, dbo.rhh_emplea.dpt_res, dbo.rhh_emplea.pai_res, dbo.rhh_emplea.ciu_res, dbo.rhh_emplea.dpt_exp, dbo.rhh_emplea.per_car, dbo.rhh_emplea.cod_car, 
                         dbo.rhh_emplea.avi_emp, dbo.opr_operarios.tip_opr, dbo.rhh_emplea.tam_emp, dbo.rhh_emplea.login_portal, dbo.rhh_emplea.pes_emp, dbo.rhh_emplea.barrio, dbo.rhh_emplea.e_mail, dbo.rhh_emplea.e_mail_alt, 
                         dbo.rhh_emplea.tel_cel, dbo.opr_operarios.cod_sec, sec.cod_sec, sec.descrip, dbo.rhh_emplea.est_lab, dbo.opr_operarios.est_lab, dbo.opr_operarios.mod_pago,opr_operarios.cod_zon,opr_operarios.cat_tur,opr_operarios.cat_vfi,opr_operarios.cod_zon,
						 opr_operarios.cod_cas,opr_operarios.cat_hor,opr_operarios.ind_rno,dbo.rhh_emplea.fec_ing, opr_operarios.ind_rdo, opr_operarios.ind_rfe,rhh_emplea.cod_cco,opr_operarios.cod_cli,opr_operarios.sit_cli,opr_operarios.dia_sec

```
