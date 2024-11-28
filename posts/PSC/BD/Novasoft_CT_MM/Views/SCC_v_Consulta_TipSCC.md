# View: SCC_v_Consulta_TipSCC

## Usa los objetos:
- [[SCC_TipoSCC]]

```sql

/*
*FECHA:			12-02-2016
*AUTOR:			DAVID GALINDO
*DESCRIPCION:	tipo scc nuevos requerimientos o personalizaciones
*/

CREATE VIEW [dbo].[SCC_v_Consulta_TipSCC] AS 
	
	Select	Tipo_SCC,Descripcion,Sigla
	FROM	SCC_TipoSCC
	WHERE	Tipo_SCC in (2,3)

```
