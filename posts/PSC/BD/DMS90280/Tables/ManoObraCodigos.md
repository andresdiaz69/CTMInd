# Table: ManoObraCodigos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkMarcaTallerModelos | nvarchar | NO |
| PkManoObraCodigos | nvarchar | NO |
| PkVariante | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UT | int | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkTarifaTaller | nvarchar | YES |
| SuperficiePintada | smallint | YES |
| FkManoObraTipos | smallint | YES |
| FechaMod | datetime | NO |
| Revision | bit | NO |
| UTGarantia | int | YES |
| ActivarModeloTaller | bit | NO |
| Manual | bit | NO |
| FkTipoOperacion | nvarchar | YES |
| HorasNomina | decimal | YES |
