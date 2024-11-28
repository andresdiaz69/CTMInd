# Table: EmpresaCentroActividadesPlantillas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkAplicacionEventos | smallint | NO |
| PkFkActividadesPlantillas | int | NO |
| PkEmpresaCentroActividadesPlantillas_Iden | int | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkSecciones | int | YES |
