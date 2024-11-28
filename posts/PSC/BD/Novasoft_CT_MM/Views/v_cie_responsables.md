# View: v_cie_responsables

## Usa los objetos:
- [[cie_alumnos]]
- [[cie_familia]]

```sql

/*SNR2020-0339 SE MODIFICA INFORMACIÓN DEL CAMPO TIPO DE PERSONA
AFLOREZ FEBRERO/2022 SPA2021-0101 SE AGREGA CAMPO DE CODIGO POSTAL*/
CREATE VIEW [dbo].[v_cie_responsables]
AS
	SELECT CASE i.ter_dec WHEN 1 THEN ide_pad WHEN 2 THEN ide_mad WHEN 3 THEN nit_ter END AS ter_nit,
	CASE i.ter_dec WHEN 1 THEN ape_nomp WHEN 2 THEN ape_nomm WHEN 3 THEN nom_ter END AS ter_nombre,
	CASE i.ter_dec WHEN 1 THEN tip_idep WHEN 2 THEN tip_idem WHEN 3 THEN tip_idet END AS tip_ide,
	CASE i.ter_dec WHEN 1 THEN dir_pad WHEN 2 THEN dir_mad WHEN 3 THEN dir_ter END AS ter_direccion,
	CASE i.ter_dec WHEN 1 THEN tel_pad WHEN 2 THEN tel_mad WHEN 3 THEN te1_ter END AS ter_telefono,
	CASE i.ter_dec WHEN 1 THEN tel_epad WHEN 2 THEN tel_emad WHEN 3 THEN te2_ter END AS ter_telefono2,
	CASE i.ter_dec WHEN 1 THEN cel_pad WHEN 2 THEN cel_mad WHEN 3 THEN '' END AS cel_telefono,
	CASE i.ter_dec WHEN 1 THEN nom1_pad WHEN 2 THEN nom1_mad WHEN 3 THEN nom1_ter END AS nom1_ter,
	CASE i.ter_dec WHEN 1 THEN nom2_pad WHEN 2 THEN nom2_mad WHEN 3 THEN nom2_ter END AS nom2_ter,
	CASE i.ter_dec WHEN 1 THEN ap1_pad WHEN 2 THEN ap1_mad WHEN 3 THEN ap1_ter END AS ap1_ter,
	CASE i.ter_dec WHEN 1 THEN ap2_pad WHEN 2 THEN ap2_mad WHEN 3 THEN ap2_ter END AS ap2_ter,
	CASE i.ter_dec WHEN 1 THEN pai_pad WHEN 2 THEN pai_mad WHEN 3 THEN pai_ter END AS cod_pai,
	CASE i.ter_dec WHEN 1 THEN dep_pad WHEN 2 THEN dep_mad WHEN 3 THEN dep_ter END AS cod_dep,
	CASE i.ter_dec WHEN 1 THEN ciu_pad WHEN 2 THEN ciu_mad WHEN 3 THEN ciu_ter END AS ter_ciu,
	CASE i.ter_dec WHEN 1 THEN email_pad WHEN 2 THEN email_mad WHEN 3 THEN email_ter END AS e_mail,
	CASE i.ter_dec WHEN 1 THEN nac_pad WHEN 2 THEN nac_mad WHEN 3 THEN nac_ter END AS ter_ciudadania,
	CONVERT(VARCHAR(50),CASE i.ter_dec WHEN 1 THEN emp_pad WHEN 2 THEN emp_mad WHEN 3 THEN '' END) AS ter_empresa,
	cod_alu
	,CASE i.ter_dec WHEN 1 THEN nom_reg_pad WHEN 2 THEN nom_reg_mad WHEN 3 THEN nom_reg_ter END AS nom_reg
	,CASE i.ter_dec WHEN 1 THEN form_ent_pad WHEN 2 THEN form_ent_mad WHEN 3 THEN form_ent_ter END AS form_ent
	,CASE i.ter_dec WHEN 1 THEN cod_oper_pad WHEN 2 THEN cod_oper_mad WHEN 3 THEN cod_oper_ter END AS cod_oper
	,CASE i.ter_dec WHEN 1 THEN email_fe_pad WHEN 2 THEN email_fe_mad WHEN 3 THEN email_fe_ter END AS email_fe
	,CASE i.ter_dec WHEN 1 THEN cod_trib_pad WHEN 2 THEN cod_trib_mad WHEN 3 THEN cod_trib_ter END AS cod_trib
	,CASE i.ter_dec WHEN 1 THEN 1 WHEN 2 THEN 1 WHEN 3 THEN tip_per_ter END AS tip_per
	,CASE i.ter_dec WHEN 1 THEN cod_postal_pad WHEN 2 THEN cod_postal_mad WHEN 3 THEN cod_postal_ter END AS cod_postal
	FROM cie_alumnos AS I WITH (NOLOCK)
	INNER JOIN cie_familia AS f WITH (NOLOCK) ON I.cod_fam=f.cod_fam;

```
