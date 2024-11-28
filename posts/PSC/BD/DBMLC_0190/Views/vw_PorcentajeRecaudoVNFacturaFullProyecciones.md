# View: vw_PorcentajeRecaudoVNFacturaFullProyecciones

## Usa los objetos:
- [[Empleados]]
- [[vw_EmpleadosRangosMaestras]]
- [[vw_PorcentajeRecaudoVNFacturaFull]]

```sql

CREATE VIEW [dbo].[vw_PorcentajeRecaudoVNFacturaFullProyecciones]
AS
SELECT        dbo.vw_PorcentajeRecaudoVNFacturaFull.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.Dia_Recaudo, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaRecaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVNFacturaFull.Empresa, dbo.vw_PorcentajeRecaudoVNFacturaFull.CodigoCentro, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.Centro, dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaFactura, dbo.vw_PorcentajeRecaudoVNFacturaFull.NumeroFactura, dbo.vw_PorcentajeRecaudoVNFacturaFull.TotalFactura, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.CuotaReteFuente, dbo.vw_PorcentajeRecaudoVNFacturaFull.TotalFacturaSinCuotaReteFuente, dbo.vw_PorcentajeRecaudoVNFacturaFull.ImporteEfecto, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.PorcentajeRecaudo, dbo.vw_PorcentajeRecaudoVNFacturaFull.VIN, dbo.vw_PorcentajeRecaudoVNFacturaFull.Nitcliente, dbo.vw_PorcentajeRecaudoVNFacturaFull.NombreCliente, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVNFacturaFull.CedulaVendedor, dbo.vw_PorcentajeRecaudoVNFacturaFull.NombreVendedor, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.Gama, dbo.vw_PorcentajeRecaudoVNFacturaFull.Modelo, dbo.vw_PorcentajeRecaudoVNFacturaFull.NumeroNotaCredito, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.ComisionRecaudoBloqueada, dbo.vw_PorcentajeRecaudoVNFacturaFull.ComisionProductividadBloqueada, ASOCIADOS.CodigoEmpleadoConMaestra, 
                         dbo.vw_PorcentajeRecaudoVNFacturaFull.VIN_Pagado, EMPLEADOS.FechaRetiro
FROM            dbo.vw_PorcentajeRecaudoVNFacturaFull LEFT OUTER JOIN
                             (SELECT        CodigoEmpleado, CodigoEmpresa, Nombres, Apellido1, Apellido2, CodigoCargo, FechaIngreso, DiasLaboradosMesIngreso, FechaRetiro, CodigoCentro, cod_marca, nombre_marca, e_mail, FechaNacimiento
                               FROM            dbo.Empleados AS Empleados_1) AS EMPLEADOS ON dbo.vw_PorcentajeRecaudoVNFacturaFull.CedulaVendedor = EMPLEADOS.CodigoEmpleado LEFT OUTER JOIN
                             (SELECT DISTINCT CodigoEmpleado AS CodigoEmpleadoConMaestra
                               FROM            dbo.vw_EmpleadosRangosMaestras
                               WHERE        (IdComisionModelo = 4)) AS ASOCIADOS ON dbo.vw_PorcentajeRecaudoVNFacturaFull.CedulaVendedor = ASOCIADOS.CodigoEmpleadoConMaestra

```
