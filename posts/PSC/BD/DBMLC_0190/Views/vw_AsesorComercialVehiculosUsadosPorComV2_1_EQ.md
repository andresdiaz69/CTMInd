# View: vw_AsesorComercialVehiculosUsadosPorComV2_1_EQ

## Usa los objetos:
- [[Empleados]]
- [[Empresas]]
- [[ExogenasVehiculosVentasEquirent]]

```sql





















CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorComV2_1_EQ]
AS
SELECT      

ExogenasVehiculosVentasEquirent.Ano AS Ano_Periodo, 
ExogenasVehiculosVentasEquirent.Mes AS Mes_Periodo, 
ExogenasVehiculosVentasEquirent.Ano AS Ano_Recaudo, 
ExogenasVehiculosVentasEquirent.Mes AS Mes_Recaudo, 
DATEFROMPARTS(ExogenasVehiculosVentasEquirent.Ano, ExogenasVehiculosVentasEquirent.Mes, 1) AS FechaRecaudo, 
ExogenasVehiculosVentasEquirent.FechaEntregaCliente, 
DATEFROMPARTS(ExogenasVehiculosVentasEquirent.Ano, ExogenasVehiculosVentasEquirent.Mes, 1) AS FechaPeriodo, 
Empleados.CodigoEmpresa, 
Empresas.NombreEmpresa AS Empresa, 
CAST(0 AS smallint) AS CodigoCentro, 
'' AS Centro, 
ExogenasVehiculosVentasEquirent.FechaVenta AS FechaFactura, 
ExogenasVehiculosVentasEquirent.NumeroFactura, 
ExogenasVehiculosVentasEquirent.Placa AS VIN, 

ISNULL(ExogenasVehiculosVentasEquirent.TotalVenta, 0) AS TotalFactura, 
ISNULL(ExogenasVehiculosVentasEquirent.TotalVenta, 0) AS TotalFacturaSinCuotaReteFuente, 
ISNULL(ExogenasVehiculosVentasEquirent.TotalVenta, 0) AS ImporteEfecto, 
100.00 AS PorcentajeRecaudo,

ISNULL(ExogenasVehiculosVentasEquirent.TotalVenta, 0) AS PrecioLista, 
0.00 AS ValorDto, 
0.00 AS ImporteImpuestos, 
ISNULL(ExogenasVehiculosVentasEquirent.TotalVenta, 0) AS PrecioBaseComision, 

CAST(0 AS smallint) AS CodigoMArca, 
ExogenasVehiculosVentasEquirent.Marca, 
CAST(0 AS smallint) AS CodigoGama, 
ExogenasVehiculosVentasEquirent.Gama, 
'' AS CodigoModelo, 
CAST(ExogenasVehiculosVentasEquirent.Modelo AS varchar(4)) AS AñoModelo, 
ExogenasVehiculosVentasEquirent.Gama AS Modelo, 
ExogenasVehiculosVentasEquirent.CodigoEmpleado AS CedulaVendedor, 
ISNULL(Empleados.Nombres,'') + ' ' + ISNULL(Empleados.Apellido1,'') + ' ' + ISNULL(Empleados.Apellido2,'') AS NombreVendedor,
0 AS IdLiquidacion, 
0 AS IdHistorico

FROM            Empresas INNER JOIN
                         Empleados ON Empresas.CodigoEmpresa = Empleados.CodigoEmpresa RIGHT OUTER JOIN
                         ExogenasVehiculosVentasEquirent ON Empleados.CodigoEmpleado = ExogenasVehiculosVentasEquirent.CodigoEmpleado



```
