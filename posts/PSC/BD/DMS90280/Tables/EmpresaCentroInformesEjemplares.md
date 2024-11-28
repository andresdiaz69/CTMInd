# Table: EmpresaCentroInformesEjemplares

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkModulos | nvarchar | NO |
| PkFkInformes | smallint | NO |
| PkEjemplares_Iden | tinyint | NO |
| Orden | tinyint | NO |
| FkInformeEjemplarTipos | nvarchar | NO |
| TextoEjemplar | nvarchar | YES |
| FkModulos_Trasero | nvarchar | YES |
| FkInformes_Trasero | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| MostrarInformeTrasero | bit | NO |
