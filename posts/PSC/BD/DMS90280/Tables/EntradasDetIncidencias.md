# Table: EntradasDetIncidencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoEntradasAlbaran | nvarchar | NO |
| PkFkTerceros | int | NO |
| PkFkSeries_Entradas | nvarchar | NO |
| PkFkNumEntradasAlbaran | nvarchar | NO |
| PkFkEntradasDet | int | NO |
| PkEntradasDetIncidencias | int | NO |
| FkIncidenciasTipos | nvarchar | NO |
| IncidenciaPositiva | bit | NO |
| UnidadesIncidencia | decimal | NO |
| UnidadesIncidenciaGestionadas | decimal | NO |
| FkTipoDocumentoIncidencias | nvarchar | YES |
| SerieDocumento | nvarchar | YES |
| NumeroDocumento | nvarchar | YES |
| AñoDocumento | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaEnvioCDN | datetime | YES |
| NumIncidenciaExterno | nvarchar | YES |
