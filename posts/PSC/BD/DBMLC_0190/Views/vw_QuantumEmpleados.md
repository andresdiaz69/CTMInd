# View: vw_QuantumEmpleados

## Usa los objetos:
- [[gen_tipide]]
- [[rhh_emplea]]
- [[rhh_tipcon]]

```sql
CREATE VIEW [dbo].[vw_QuantumEmpleados]
AS
SELECT e.cod_cia,cedula = e.cod_emp, Nombres = e.nom_emp, Apellidos = e.ap1_emp + ' ' + e.ap2_emp, e.tip_ide, DescripcionTipoIde = i.des_tip, e.tip_con, 
		DescrpcionTipoCon = t .nom_con, e.fec_ing ​
FROM        [Novasoft_CT_MM].dbo.rhh_emplea e ​
LEFT JOIN	[Novasoft_CT_MM].dbo.gen_tipide i ON e.tip_ide = i.cod_tip ​ 
LEFT JOIN	[Novasoft_CT_MM].dbo.rhh_tipcon t ON e.tip_con = t .tip_con ​
WHERE  e.cod_emp <> '0' ​ AND (e.fec_egr IS NULL OR e.fec_egr > getdate()) ​

```
