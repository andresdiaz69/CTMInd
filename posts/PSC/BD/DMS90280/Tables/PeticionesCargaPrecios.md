# Table: PeticionesCargaPrecios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPeticionesCargaPrecios_Iden | smallint | NO |
| FkCentros | smallint | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| CosteKw | decimal | NO |
| PvpKw | decimal | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
