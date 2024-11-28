# Table: DialogoAplicacionesExternas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkImportadoras | int | NO |
| PkFkMarcas | smallint | NO |
| PkDialogoAplicacionesExternas_TipoPrecedente | nvarchar | NO |
| PkDialogoAplicacionesExternas_TipoActual | nvarchar | NO |
| PkDialogoAplicacionesExternas_TipoDestino | nvarchar | NO |
| ExistenElementos | bit | NO |
| Criterio | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
