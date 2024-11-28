# View: vw_ComisionesSpigaTallerPorOT_Desplazamiento

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
CREATE VIEW [dbo].[vw_ComisionesSpigaTallerPorOT_Desplazamiento]
AS

SELECT   CodigoCentro, Centro, CodigoSeccion, Seccion, Año + '\' + Tipo + '\' + Numero AS NumeroOT, NumeroTrabajo, DescripcionTrabajo, CONVERT(decimal(18,0), ValorUnitario) as ValorUnitario, CONVERT(decimal(18,2), PorcentajeDescuento) AS PorcentajeDescuento, 
			CONVERT(decimal(18,0),ValorNeto) as ValorNeto, FechaFactura, Codigo, descripcion, CedulaOperario, NombreOperario, CONVERT(decimal(18,2), UnidadesVendidas) as UnidadesVendidas	

FROM(		SELECT      DISTINCT NumOT, SUBSTRING(NumOT, 1, 4) AS Año, SUBSTRING(NumOT, 6, CHARINDEX('\', NumOT, 6) - 1 - CHARINDEX('\', NumOT, 1)) AS Tipo, 
									SUBSTRING(NumOT, CHARINDEX('\', NumOT, 6) + 1, CHARINDEX('\', NumOT, CHARINDEX('\', NumOT, CHARINDEX('\', NumOT, 6)) + 1) - CHARINDEX('\', NumOT, 6) - 1) AS Numero, 
									SUBSTRING(NumOT, CHARINDEX('\', NumOT, CHARINDEX('\', NumOT, CHARINDEX('\', NumOT, 6)) + 1) + 1, 5) AS NumeroTrabajo, CodigoCentro, Centro, CodigoSeccion, 
									Seccion, DescripcionTrabajo, ValorUnitario, PorcentajeDescuento, FechaFactura, Codigo, descripcion, CedulaOperario, NombreOperario, UnidadesVendidas, ValorNeto 
			FROM          dbo.ComisionesSpigaTallerPorOT
			WHERE       (Centro LIKE 'JD%')  AND (TipoOperacion = 'MO') 	  
) AS a

```
