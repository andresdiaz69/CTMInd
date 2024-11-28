# Table: ModeloEspecificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkFkEspecificacionesTipos | smallint | NO |
| ValorEspecificacion | nvarchar | NO |
| Importado | bit | NO |
| Modificado | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkModeloEspecificacionesTipos_Iden | smallint | NO |
| DatosRelacionados | nvarchar | YES |
| DatosExclusion | nvarchar | YES |
| FkEspecificacionesTiposValores | smallint | YES |
| ValorEspecificacionExterno | nvarchar | YES |
