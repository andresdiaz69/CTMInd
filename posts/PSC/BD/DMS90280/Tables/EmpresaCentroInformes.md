# Table: EmpresaCentroInformes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkModulos | nvarchar | NO |
| PkFkInformes | smallint | NO |
| TextoCopiaComoMarcaAgua | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| MuestraInformacionImpresion | bit | YES |
| FkPapelTamaños_Destino | nvarchar | YES |
| MostrarTextoAdicionalGarantia | bit | NO |
| FechaMod | datetime | NO |
| ImpresionMultiple | bit | NO |
| MuestraTextoEjemplar | bit | NO |
| MuestraTextoCopia | bit | NO |
| GuardarDocumento | bit | NO |
| FkImpresionDuplexTipos | tinyint | NO |
| Biofirmar | bit | NO |
| ActualizableParaBiofirma | bit | NO |
| FkBiofirmaSistemasConfiguraciones | smallint | YES |
