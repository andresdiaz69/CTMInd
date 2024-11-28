# Table: FacturasZeroComaAlbaranes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkFacturasZeroComa | int | NO |
| PkFacturasZeroComaAlbaranes_iden | smallint | NO |
| FkAsientoGestionEliminacion | nvarchar | YES |
| FkAsientoGestionEliminacionDet | smallint | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| TotalAlbaran | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Procedencia | nvarchar | YES |
| IdModulo | nvarchar | YES |
