# Table: GarantiaTiposTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGarantiaTipos | nvarchar | NO |
| PkFkTipoInternoGarantia | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkGarantiaTiposTerceros_Iden | tinyint | NO |
| FkGamas | smallint | YES |
| PrecioHora | decimal | YES |
| FkMonedas_Fabricante | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
