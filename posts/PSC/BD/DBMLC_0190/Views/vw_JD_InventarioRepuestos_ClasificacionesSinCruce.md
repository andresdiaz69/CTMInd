# View: vw_JD_InventarioRepuestos_ClasificacionesSinCruce

## Usa los objetos:
- [[Centros]]
- [[JD_InventarioRepuestos]]
- [[Secciones]]

```sql
CREATE VIEW [dbo].[vw_JD_InventarioRepuestos_ClasificacionesSinCruce] AS
	--INFORMACIÓN DE LAS CLASIFICACIONES QUE NO SE ENCONTRARON REFERENCIAS 
	SELECT DISTINCT G.IdRegistro, G.Ano_Periodo, G.Mes_Periodo, G.IdEmpresas, G.NombreEmpesa, G.IdMarcas, G.NombreMarca, G.IdCentros, 
		C.NombreCentro, G.IdSecciones, (S.Seccion)NombreSeccion, G.IdReferencias, G.IdMR, G.IdClasificacion5, G.DenominacionClasificacion5, 
		G.IdClasificacion6, G.DenominacionClasificacion6, G.PrecioMedio, G.Stock
	FROM
	(
		--INFO CLASIFICACION 5
		SELECT * FROM JD_InventarioRepuestos 
		WHERE LTRIM(RTRIM(IdClasificacion5)) NOT IN ('4','5','7')

		UNION ALL

		--INFO CLASIFICACION 6
		SELECT * FROM JD_InventarioRepuestos 
		WHERE LTRIM(RTRIM(IdClasificacion6)) NOT IN ('1','2','3','4','5','6','9','10')
	)G
	LEFT JOIN Centros	C ON C.CodigoCentro = G.IdCentros
	LEFT JOIN Secciones S ON S.CodigoSeccion = G.IdSecciones

```
