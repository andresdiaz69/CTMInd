# Table: Provision_CA_BackupPdtProvision

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdBackupPendiente | bigint | NO |
| FechaCreacion | datetime | NO |
| FechaCalculo | date | NO |
| IdEmpresa | int | YES |
| Empresa | nvarchar | YES |
| IdTercero | bigint | YES |
| NombreTercero | nvarchar | YES |
| NifCif | nvarchar | YES |
| Tramo | nvarchar | YES |
| Direccion | nvarchar | YES |
| Ciudad | nvarchar | YES |
| Telefonos | nvarchar | YES |
| FacturaVenta | nvarchar | YES |
| FechaFactura | date | YES |
| FechaVencimiento | date | YES |
| FormaPago | nvarchar | YES |
| TotalFactura | decimal | YES |
| ImportePendiente | decimal | YES |
| Situacion | nvarchar | YES |
| Centro | nvarchar | YES |
| Departamento | nvarchar | YES |
| FechaEntregaVN | date | YES |
| FechaEntregaVO | date | YES |
| ReferenciaInterna | nvarchar | YES |
| Referencia | nvarchar | YES |
| CupoCredito | decimal | YES |
| VIN | nvarchar | YES |
| Seccion | nvarchar | YES |
| DiasCartera | int | YES |
| DiasMora | int | YES |
| PagoBloqueado | nvarchar | YES |
| CuentaContable | nvarchar | YES |
| TipoClasificacion | nvarchar | YES |
| CuentaProvision | nvarchar | YES |
| Naturaleza | nvarchar | YES |
| ValorProvision | decimal | YES |
