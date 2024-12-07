# Table: VehiculoFacturasDetTerceroCabecera

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkFkVehiculoFacturas | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| FkFacturaTipos | nvarchar | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FechaFactura | datetime | NO |
| NombreTratamiento | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| NifCif | nvarchar | YES |
| FkCalleTipos | nvarchar | YES |
| NombreCalle | nvarchar | YES |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FkCodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| Comision | nvarchar | YES |
| DescripcionVersion | nvarchar | YES |
| DescripcionColor | nvarchar | YES |
| Observaciones | nvarchar | YES |
| TextoRegistroMercantil | nvarchar | YES |
| TextoCondicionesParticulares | nvarchar | YES |
| NombreMarca | nvarchar | NO |
| NombreGama | nvarchar | NO |
| DescripcionModelo | nvarchar | NO |
| PorcentajeReparto | decimal | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkPagoFormas | nvarchar | NO |
| TotalFactura | decimal | NO |
| EsFinanciera | bit | NO |
| DescripcionFormaPago | nvarchar | YES |
| FkAñoFactura_Abonado | nvarchar | YES |
| FkSeries_Factura_Abonado | nvarchar | YES |
| FkNumFactura_Abonado | nvarchar | YES |
| FechaAbono | datetime | YES |
| FechaMod | datetime | NO |
| FkTextoSistema_CSW | int | YES |
| FkTextoSistema_DA | int | YES |
| FkTextoSistema_EI | int | YES |
| FkTerceroDirecciones | smallint | NO |
| FkTextoSistema_TABONOS | int | YES |
| Complemento2 | nvarchar | YES |
| FkEstados | nvarchar | YES |
| Estado | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkMotivosAbono | nvarchar | YES |
| DescripcionMotivoAbono | nvarchar | YES |
| FkTextoSistema_LPDRtf | int | YES |
| FkTextoAbono_ParcialTotal | int | YES |
| FkDocumentoEmitidoTipos | smallint | YES |
| DescripcionDocumentacionTipos | nvarchar | YES |
