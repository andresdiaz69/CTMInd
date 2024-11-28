# Table: IntegracionesAnticipo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkIntegracionesAnticipo_Iden | smallint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkWebServicesTipos | nvarchar | YES |
| Descripcion | nvarchar | YES |
| IntegracionManual | bit | YES |
| GeneraAnticiposAutomaticamente | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
