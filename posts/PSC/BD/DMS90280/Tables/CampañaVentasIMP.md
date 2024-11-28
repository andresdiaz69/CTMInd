# Table: CampañaVentasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCampañaVentasIMP | bigint | NO |
| FkProcesos | int | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| FechaAltaCampaña | datetime | YES |
| FechaBajaCampaña | datetime | YES |
| Precio | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
