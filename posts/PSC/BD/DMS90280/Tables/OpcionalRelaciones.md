# Table: OpcionalRelaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkFkVersiones | nvarchar | NO |
| PkFkOpcionales_A | nvarchar | NO |
| PkFkOpcionalTipos_A | nvarchar | NO |
| PkFkOpcionalRelacionTipos | nvarchar | NO |
| PkNumeroRelacion_Iden | int | NO |
| FkOpcionales_B | nvarchar | YES |
| FkOpcionalTipos_B | nvarchar | YES |
| Descripcion | nvarchar | YES |
| Importado | bit | YES |
| Modificado | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
