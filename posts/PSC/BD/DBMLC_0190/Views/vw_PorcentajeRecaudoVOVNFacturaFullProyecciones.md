# View: vw_PorcentajeRecaudoVOVNFacturaFullProyecciones

## Usa los objetos:
- [[Empleados]]
- [[vw_EmpleadosRangosMaestras]]
- [[vw_PorcentajeRecaudoVOVNFacturaFull]]

```sql


CREATE VIEW [dbo].[vw_PorcentajeRecaudoVOVNFacturaFullProyecciones]
AS
SELECT        dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Ano_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Mes_Recaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Dia_Recaudo, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaRecaudo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CodigoEmpresa, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Empresa, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CodigoCentro, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Centro, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaFactura, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NumeroFactura, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.TotalFactura, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CuotaReteFuente, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.TotalFacturaSinCuotaReteFuente, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.ImporteEfecto, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.PorcentajeRecaudo, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.VIN, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Nitcliente, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NombreCliente, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.FechaEntregaCliente, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CedulaVendedor, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NombreVendedor, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Gama, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.Modelo, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.NumeroNotaCredito, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.ComisionRecaudoBloqueada, dbo.vw_PorcentajeRecaudoVOVNFacturaFull.ComisionProductividadBloqueada, ASOCIADOS.CodigoEmpleadoConMaestra, 
                         dbo.vw_PorcentajeRecaudoVOVNFacturaFull.VIN_Pagado, EMPLEADOS.FechaRetiro
FROM            dbo.vw_PorcentajeRecaudoVOVNFacturaFull LEFT OUTER JOIN
                             (SELECT        CodigoEmpleado, CodigoEmpresa, Nombres, Apellido1, Apellido2, CodigoCargo, FechaIngreso, DiasLaboradosMesIngreso, FechaRetiro, CodigoCentro, cod_marca, nombre_marca, e_mail, FechaNacimiento
                               FROM            dbo.Empleados AS Empleados_1) AS EMPLEADOS ON dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CedulaVendedor = EMPLEADOS.CodigoEmpleado LEFT OUTER JOIN
                             (SELECT DISTINCT CodigoEmpleado AS CodigoEmpleadoConMaestra
                               FROM            dbo.vw_EmpleadosRangosMaestras
                               WHERE        (IdComisionModelo = 4)) AS ASOCIADOS ON dbo.vw_PorcentajeRecaudoVOVNFacturaFull.CedulaVendedor = ASOCIADOS.CodigoEmpleadoConMaestra

```
