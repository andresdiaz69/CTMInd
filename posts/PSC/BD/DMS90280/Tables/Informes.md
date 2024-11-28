# Table: Informes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkModulos | nvarchar | NO |
| PkInformes_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| NombreAbreviado | nvarchar | YES |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Numerador | bit | NO |
| TipoMembrete | tinyint | NO |
| MuestraInformacionImpresion | bit | NO |
| Orientacion | nvarchar | NO |
| FkPapelTamaños | nvarchar | NO |
| FkInformeTipos | nvarchar | NO |
| Accion | nvarchar | YES |
| PuedeConfigurar | bit | NO |
| TituloInforme | nvarchar | NO |
| FechaMod | datetime | NO |
| LeyendaTercero | bit | NO |
| PuedeConfigurarEjemplares | bit | NO |
| PuedeConfigurarGuardadoDocumento | bit | NO |
| NivelConfiguracion1 | nvarchar | YES |
| NivelConfiguracion2 | nvarchar | YES |
| FkRegimenContable | nvarchar | YES |
| NFacturas | smallint | YES |
| NivelConfiguracion3 | nvarchar | YES |
| PuedeConfigurarBiofirmado | bit | NO |
| FechaBaja | datetime | YES |
| SoloFirmaAutomatica | bit | YES |
