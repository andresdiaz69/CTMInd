# Table: EmpresaCentroInformesEjemplaresAcciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkModulos | nvarchar | NO |
| PkFkInformes | smallint | NO |
| PkFkEjemplares | tinyint | NO |
| PkAcciones_Iden | tinyint | NO |
| Orden | tinyint | NO |
| FkInformeAccionTipos | tinyint | NO |
| Parametros | nvarchar | YES |
| Fichero | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
