# View: vw_spiga_VehiculosSeguros

## Usa los objetos:
- [[spiga_VehiculosSeguros]]

```sql
CREATE VIEW [dbo].[vw_spiga_VehiculosSeguros]
AS
SELECT        IdSincronizacionSpiga, IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdVehiculos, IdVehiculoSeguros, IdSeguroTipos, DescripcionSeguroTipos, FechaAlta, IdTerceros, FechaVencimiento, Importe, ImporteFranquicia, 
                         FechaBaja, IdEmpresasVO, IdCentrosVO, AñoExpedienteVO, SerieExpedienteVO, NumExpedienteVO, IdVentas_VO, IdEmpresasVN, IdCentrosVN, AñoExpedienteVN, SerieExpedienteVN, NumExpedienteVN, NumVenta_VN, 
                         UserMod, HostMod, VersionFila, IdVehiculoSeguros_Abonado, NumeroPoliza, IdPaises, IdCodigosPostales, Matricula, IdMarcas, NombreMarca, IdGamas, NombreGama, CodModelo, ExtModelo, AñoModelo, NombreModelo, 
                         IdVersiones, DescripcionVersion, IdTerceros_Propietario, NifCif, Nombre, Apellido1, Apellido2, FechaNacimiento, FechaCarnet, IdTerceroDirecciones, IdDireccionClases, IdCalleTipos, NombreCalle, Numero, Bloque, Piso, Puerta, 
                         Complemento, IdPaisesDirecciones, IdCodigosPostalesDirecciones, Poblacion, Provincia, FechaBajaDirecciones, IdEstados, IdProvincias, Complemento2, Telefonos, NombreSeguro, NombreEmpleado, Apellido1Empleado, 
                         Apellido2Empleado, DescripcionTipoCalle, Tomador, FechaCarnetCaducidad, Observaciones, IdMonedas, FactorCambioMoneda, ImporteComisionVenta, VIN, NombreCentroVN, NombreCentroVO, NombreCentroComprasVN, 
                         NombreCentroComprasVO
FROM            PSCService_DB.dbo.spiga_VehiculosSeguros

```
