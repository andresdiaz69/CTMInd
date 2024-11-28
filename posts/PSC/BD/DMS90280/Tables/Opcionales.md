# Table: Opcionales

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkFkVersiones | nvarchar | NO |
| PkOpcionales | nvarchar | NO |
| PkFkOpcionalTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Exclusive | bit | NO |
| Importado | bit | NO |
| Modificado | bit | NO |
| DeSerie | bit | NO |
| FkOpcionalPinturaTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkOpcionalEquipamientoTipos | nvarchar | YES |
| DeConcesion | bit | NO |
| CodExternoOpcionales | nvarchar | YES |
| Alquiler | bit | NO |
| DescripcionFactura | nvarchar | YES |
| Activo | bit | NO |
