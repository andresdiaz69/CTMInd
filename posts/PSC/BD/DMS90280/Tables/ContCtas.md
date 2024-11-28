# Table: ContCtas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkContCtas | nvarchar | NO |
| Nombre | nvarchar | NO |
| FkContCtaTipos | tinyint | NO |
| TipoCalculo | nvarchar | NO |
| FkContNiveles | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ExcluirConsolidacion | bit | NO |
| FechaMod | datetime | NO |
| PermiteAsientosManuales | bit | NO |
| CtaPuente | bit | NO |
| RealizaAsientoDiferenciaCambial | bit | NO |
| RealizaAsientoConversion | bit | NO |
| RealizaProvisionDiferenciaCambial | bit | NO |
| RealizaProvisionConversion | bit | NO |
