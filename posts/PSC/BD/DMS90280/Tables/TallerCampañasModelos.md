# Table: TallerCampañasModelos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkTallerCampañas | nvarchar | NO |
| PkFkCampañaVariante | nvarchar | NO |
| PkTallerCampañasModelos_Iden | int | NO |
| FkCodModelo_Inicial | nvarchar | YES |
| FkCodModelo_Final | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
