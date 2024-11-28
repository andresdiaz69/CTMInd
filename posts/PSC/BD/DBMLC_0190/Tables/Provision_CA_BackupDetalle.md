# Table: Provision_CA_BackupDetalle

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdBackupDetalle | bigint | NO |
| FechaCreacion | datetime | NO |
| FechaCalculo | date | NO |
| IdEmpresa | int | YES |
| NombreEmpresa | nvarchar | YES |
| Cuenta | nvarchar | YES |
| IdTercero | int | YES |
| FechaAsiento | date | YES |
| NumeroAsiento | int | YES |
| Factura | nvarchar | YES |
| FechaFactura | date | YES |
| TipoFactura | nvarchar | YES |
| Debe | decimal | YES |
| Haber | decimal | YES |
| Concepto | nvarchar | YES |
| FacturaConciliacion | nvarchar | YES |
| Centro | int | YES |
| NombreCentro | nvarchar | YES |
| Seccion | int | YES |
| Nombreseccion | nvarchar | YES |
| Departamento | nvarchar | YES |
| NombreDepto | nvarchar | YES |
