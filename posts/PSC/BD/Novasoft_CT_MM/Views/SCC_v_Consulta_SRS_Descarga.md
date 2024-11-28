# View: SCC_v_Consulta_SRS_Descarga

## Usa los objetos:
- [[SCC_Anexos]]
- [[SCC_Cabeza]]

```sql
/*
*FECHA:			05-02-2016
*AUTOR:			DAVID GALINDO
*DESCRIPCION:	VISTA consultar srs descarga
*/

CREATE VIEW [dbo].[SCC_v_Consulta_SRS_Descarga] AS 
	
	Select  DISTINCT Nro_SCC
	FROM	SCC_Cabeza AS C INNER JOIN SCC_Anexos AS A
			ON C.Nro_Formato = A.Nro_Formato
	WHERE  Tipo_SCC = 1

```
