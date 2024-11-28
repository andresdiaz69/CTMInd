# View: v_sst_votaciones

## Usa los objetos:
- [[SST_ConvocatComite]]
- [[SST_ConvocatCopasst]]

```sql
-- =============================================
-- Author:		Jorge Diaz
-- Create date: 2020.10.15
-- Description:	Retorna vista con datos para filtros de consulta: Informe Seguimiento Votaciones
--
--	SELECT * from v_usr_sp_sst_votaciones WHERE cod_cia like '01' and nom_comite LIKE 'Copasst'
--
-- =============================================
CREATE VIEW [dbo].[v_sst_votaciones]
AS

	SELECT cod_conv_comite AS cod_comite, 'Convivencia ' + CONVERT(VARCHAR(20),	fec_crea, 111) AS comite, 'Convivencia' AS nom_comite, cod_cia 
	FROM SST_ConvocatComite 
	UNION 
	SELECT cod_conv_copasst AS cod_comite, 'Copasst    ' + CONVERT(VARCHAR(20), fec_crea, 111) AS comite, 'Copasst' AS nom_comite, cod_cia 
	FROM SST_ConvocatCopasst;


```
