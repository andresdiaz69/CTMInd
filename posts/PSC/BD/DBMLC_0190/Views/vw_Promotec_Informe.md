# View: vw_Promotec_Informe

## Usa los objetos:
- [[Promotec_Cotizacion_Automoviles]]
- [[Promotec_Cotizacion_Clientes]]
- [[Promotec_Cotizacion_Comerciales]]
- [[Promotec_Cotizacion_Respuestas]]
- [[Promotec_Cotizacion_Solicitudes]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_Promotec_Informe] AS
SELECT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY Marca)) AS INT),0) AS Id, CodMarca, Marca, CodSala, Sala, FechaCotizacion, NitCliente, NombreCliente, 
	CodFasecolda, LineaVH, Modelo, Chasis, CodAsesorCT, AsesorCT, Aseguradora, Producto, ValorPoliza, Estado
FROM 
(
	SELECT DISTINCT (LTRIM(RTRIM(U.CodUnidadNegocio)))CodMarca, (LTRIM(RTRIM(UPPER(CO.Marca))))Marca, (U.CodCentro)CodSala, (CO.Vitrina)Sala, 
		(S.FechaSolicitud)FechaCotizacion, (A.CodigoFasecolda)CodFasecolda, (LTRIM(RTRIM(CL.NumeroDocumento)))NitCliente, 
		REPLACE(REPLACE(REPLACE((CL.Nombre + ' ' + CL.PrimerApellido + ' ' + CL.SegundoApellido),' ','<>'),'><',''),'<>',' ')NombreCliente,
		(UPPER(LTRIM(RTRIM((A.Marca + ' ' + ' ' + A.Referencia)))))LineaVH, (LTRIM(RTRIM(A.Modelo)))Modelo, (LTRIM(RTRIM(A.NumeroChasis)))Chasis,
		(CO.IdEmpleado)CodAsesorCT,(REPLACE(REPLACE(REPLACE((CO.Nombre),' ','<>'),'><',''),'<>',' '))AsesorCT,(R.Aseguradora)Aseguradora,
		(R.Producto)Producto,(R.ValorPrima)ValorPoliza,Estado='COTIZADO'
	FROM Promotec_Cotizacion_Solicitudes AS S
	LEFT JOIN Promotec_Cotizacion_Automoviles		AS A	ON S.IdCotizacion = A.IdAutomovil 
	LEFT JOIN Promotec_Cotizacion_Clientes			AS CL	ON S.IdCotizacion = CL.IdCliente 
	LEFT JOIN Promotec_Cotizacion_Comerciales		AS CO	ON S.IdCotizacion = CO.IdComercial 
	LEFT JOIN Promotec_Cotizacion_Respuestas		AS R	ON S.IdCotizacion = R.IdCotizacion 
	LEFT JOIN vw_UnidadDeNegocio					AS U	ON CO.Vitrina = U.NombreCentro
) A

```
