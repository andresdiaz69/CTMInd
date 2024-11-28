# Table: VehiculoMensajes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkVehiculoMensajes_Iden | smallint | NO |
| Mensaje | nvarchar | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkImportadoras | int | YES |
| FkMarcas | smallint | YES |
| FkImportadoraMarcasMensajeTipos | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
