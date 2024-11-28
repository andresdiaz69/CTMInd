# View: v_Parametros_ViajeroFrecuente

## Usa los objetos:
- [[Cargos]]
- [[Parametros_ViajeroFrecuente]]
- [[v_UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[v_Parametros_ViajeroFrecuente]
AS
SELECT        vf.Id, vf.CodigoCargo, c.NombreCargo, vf.CodigoUnidadNegocio, u.NombreUnidadNegocio, vf.ViajeroFrecuente
FROM            dbo.Parametros_ViajeroFrecuente AS vf INNER JOIN
                         dbo.Cargos AS c ON vf.CodigoCargo = c.CodigoCargo INNER JOIN
                         dbo.v_UnidadDeNegocio AS u ON vf.CodigoUnidadNegocio = u.CodUnidadNegocio


```
