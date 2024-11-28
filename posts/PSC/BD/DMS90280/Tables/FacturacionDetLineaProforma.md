# Table: FacturacionDetLineaProforma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFacturaProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumFacturaProforma | nvarchar | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries_OT | nvarchar | NO |
| PkFkNumOT | int | NO |
| PkFkNumTrabajo | tinyint | NO |
| PkFacturacionDetLineaProforma_Iden | int | NO |
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
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PorcCompensacion | decimal | YES |
| IdentificacionKit | nvarchar | YES |
| DetallarKit | bit | NO |
| Sobretasa | decimal | YES |
