# View: vw_ComisionesEsquemasManuales

## Usa los objetos:
- [[ComisionesEsquemasManuales]]
- [[ComisionesManualesEsquemasTipos]]
- [[ComisionesManualesModelos]]
- [[UnidadDeNegocioComisionesManuales]]

```sql


CREATE VIEW [com].[vw_ComisionesEsquemasManuales]
AS
SELECT        cem.IdEsquema,		cem.NombreEsquema,			cmm.IdComisionModelo,		cmm.NombreModelo,	
			  cmm.CodigoModelo,     cem.IdUnidadNegocio,		uncm.NombreUnidadNegocio,   cem.DiaCorte,
			  cmet.IdTipoEsquema,   cmet.NombreTipoEsquema,     cem.Activar
FROM            com.ComisionesEsquemasManuales cem
						 JOIN com.ComisionesManualesModelos cmm ON cem.IdComisionModelo = cmm.IdComisionModelo 
						 JOIN com.UnidadDeNegocioComisionesManuales uncm on cem.IdUnidadNegocio = uncm.IdUnidadNegocio
						 JOIN com.ComisionesManualesEsquemasTipos cmet on cmet.IdTipoEsquema = cem.IdTipoEsquema

```
