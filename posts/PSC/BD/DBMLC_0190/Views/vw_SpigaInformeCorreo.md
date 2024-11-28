# View: vw_SpigaInformeCorreo

## Usa los objetos:
- [[ComisionesSpigaCamposVehiculos]]
- [[ComisionesSpigaInformeCorreo]]

```sql


CREATE VIEW [dbo].[vw_SpigaInformeCorreo]
AS
SELECT DISTINCT 
                         dbo.ComisionesSpigaInformeCorreo.FechaAltaDesde, dbo.ComisionesSpigaInformeCorreo.FechaAltaHasta, dbo.ComisionesSpigaInformeCorreo.Ano_Periodo, dbo.ComisionesSpigaInformeCorreo.Mes_Periodo, 
                         dbo.ComisionesSpigaInformeCorreo.PkTerceros, dbo.ComisionesSpigaInformeCorreo.Tercero, dbo.ComisionesSpigaInformeCorreo.FechaNacimiento, dbo.ComisionesSpigaInformeCorreo.NumDocumento, 
                         dbo.ComisionesSpigaInformeCorreo.Poblacion, dbo.ComisionesSpigaInformeCorreo.Departamento, dbo.ComisionesSpigaInformeCorreo.Telefono, dbo.ComisionesSpigaInformeCorreo.Perfil AS Tipocliente, 
                         dbo.ComisionesSpigaInformeCorreo.Direccion, dbo.ComisionesSpigaInformeCorreo.Email, dbo.ComisionesSpigaInformeCorreo.CodTerceroConductor, dbo.ComisionesSpigaInformeCorreo.Conductor, 
                         dbo.ComisionesSpigaInformeCorreo.FechaVenta, dbo.ComisionesSpigaInformeCorreo.FechaEntrega, dbo.ComisionesSpigaInformeCorreo.CodTerceroFinanciera, dbo.ComisionesSpigaInformeCorreo.Financiera, 
                         dbo.ComisionesSpigaInformeCorreo.TipoFinanciacion, dbo.ComisionesSpigaInformeCorreo.TiempoFinanciacion, dbo.ComisionesSpigaInformeCorreo.TarjetaFidelizacion, dbo.ComisionesSpigaInformeCorreo.DescuentoMat, 
                         dbo.ComisionesSpigaInformeCorreo.DescuentoMatPintura, dbo.ComisionesSpigaInformeCorreo.DescuentoMO, dbo.ComisionesSpigaInformeCorreo.DescuentoTrabajosExternos, 
                         dbo.ComisionesSpigaInformeCorreo.DescuentoVarios, dbo.ComisionesSpigaCamposVehiculos.FkMarcas, dbo.ComisionesSpigaCamposVehiculos.Marca, dbo.ComisionesSpigaCamposVehiculos.FkGamas, 
                         dbo.ComisionesSpigaCamposVehiculos.Gama, dbo.ComisionesSpigaCamposVehiculos.FkCodModelo, dbo.ComisionesSpigaCamposVehiculos.Modelo, dbo.ComisionesSpigaCamposVehiculos.FkVersiones, 
                         dbo.ComisionesSpigaCamposVehiculos.Version, dbo.ComisionesSpigaCamposVehiculos.PkCentros, dbo.ComisionesSpigaCamposVehiculos.Centro, dbo.ComisionesSpigaCamposVehiculos.Matricula, 
                         dbo.ComisionesSpigaCamposVehiculos.FkAñoModelo AS FkAnoModelo, dbo.ComisionesSpigaCamposVehiculos.KMS, dbo.ComisionesSpigaCamposVehiculos.UltimaEntradaTaller AS FechaUltimaVisitaTaller
FROM            dbo.ComisionesSpigaInformeCorreo INNER JOIN
                         dbo.ComisionesSpigaCamposVehiculos ON dbo.ComisionesSpigaInformeCorreo.PkTerceros = dbo.ComisionesSpigaCamposVehiculos.IdTercerosPropietario

```
