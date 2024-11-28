# View: v_Rhh_IDprocesosImport

## Usa los objetos:
- [[Rhh_IDprocesosImport]]

```sql

CREATE VIEW  v_Rhh_IDprocesosImport
AS 
SELECT 
	COD_PROCESO aS COD_PROC,
	ID_PROCESO, 
	FECHAEJECUCION,
	REPLACE(REPLACE (NOM_TABLA, 'GTH_',''),'rhh_','') AS NOM_TABLA,
	REPLACE(REPLACE(REPLACE(REPLACE (CAST(PARAMETROS AS nVARCHAR(MAX)),'%','TODAS'),'ROOT',''),'>',''),'<','') AS PARAMETROS,
	REPLACE(REPLACE(REPLACE(CAST(RESULTADO AS nVARCHAR(MAX)),'ROOT',''),'>',''),'<','') AS RESULTADO ,
	CASE  usuario  WHEN  NULL THEN   ISNULL(usuario,'Nombre No Asignado')
							WHEN ''    THEN   'Nombre No Asignado'	
							ELSE 'consultar al administrador' END  AS USUARIO
FROM [dbo].[Rhh_IDprocesosImport] I
WHERE COD_PROCESO LIKE 'NOM%'


```
