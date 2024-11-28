# View: v_Rhh_Liquida_IDL

## Usa los objetos:
- [[Rhh_Liquida_IDL]]
- [[v_sis_usuario]]

```sql

CREATE VIEW  [dbo].[v_Rhh_Liquida_IDL]
AS 
SELECT 
	IDL_num as  idl_num,
	CASE  usuario  WHEN  NULL THEN   ISNULL(usuario,'Nombre No Asignado')
				WHEN ''    THEN   'Nombre No Asignado'	
				ELSE ISNULL(nombre_usuario,'No Definido') END  AS Usuario, 
	fec_eje,
	fec_fin,
	fec_liq,
	fec_cte,
	cad_liq,
	cad_crit,
	ISNULL(cod_plt,'') AS cod_plt ,
	REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(CAST(RESULTADO AS nVARCHAR(MAX)),'ROOT',''),'>',''),'<',''),'&#','..'),'/','') AS RESULTADO 
	FROM [dbo].[Rhh_Liquida_IDL] I
	LEFT JOIN v_sis_usuario U ON U.cod_usuario = I.usuario

```
