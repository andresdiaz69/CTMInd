# Table: FacturacionDetLineaImpresion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries_OT | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFacturacionDetLineaImpresion_Iden | int | NO |
| FkDetalleFacturaTipos | nvarchar | YES |
| Referencia | nvarchar | YES |
| Denominacion | nvarchar | YES |
| Unidades | decimal | YES |
| Precio | decimal | YES |
| PorcDescuento | decimal | YES |
| CausaAveria | bit | YES |
| Clasificacion | nvarchar | YES |
| Marca | nvarchar | YES |
| Empleados | nvarchar | YES |
| GastosAdicionales | decimal | YES |
| FkManoObraTipos | smallint | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkTipoLineaFacturacionDetLinea | tinyint | YES |
| PorcCompensacion | decimal | YES |
| DescripcionCamp | nvarchar | YES |
| IdentificacionAplicacionExterna | nvarchar | YES |
| IdentificacionLineaOrigen | nvarchar | YES |
| IdentificacionLineaOrigenCargo | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
