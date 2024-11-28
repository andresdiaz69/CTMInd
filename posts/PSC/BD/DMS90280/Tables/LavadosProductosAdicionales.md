# Table: LavadosProductosAdicionales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkLavadosProductosAdicionales_Iden | smallint | NO |
| FkLavaderos | smallint | NO |
| FkLavados | int | NO |
| Descripcion | nvarchar | NO |
| Minutos | smallint | NO |
| PrecioVenta | decimal | YES |
| DescripcionFactura | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
