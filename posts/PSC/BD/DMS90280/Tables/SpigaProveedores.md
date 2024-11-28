# Table: SpigaProveedores

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkFkTerceroDirecciones | smallint | NO |
| PkFkSpigaIntegracionTipos | smallint | NO |
| CodigoEmpresa | int | NO |
| CodigoCentro | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| IdTerceroDirecciones_Destino | smallint | YES |
| IdInstalacion | nvarchar | YES |
