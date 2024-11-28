# Table: Neumaticos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkVehiculos | int | NO |
| PkNeumaticos_Iden | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| NumNeumaticos | tinyint | NO |
| Descripcion | nvarchar | NO |
| FkFabricantes | smallint | YES |
| Ancho | decimal | YES |
| Alto | decimal | YES |
| TipoConstruccion | nvarchar | YES |
| DiametroLlanta | decimal | YES |
| DiametroNeumatico | decimal | YES |
| IndiceCarga | nvarchar | YES |
| IndiceVelocidad | nvarchar | YES |
| NumDirectiva | nvarchar | YES |
| EficienciaEnergetica | nvarchar | YES |
| AdherenciaMojado | nvarchar | YES |
| CatRuido | nvarchar | YES |
| RuidoExt | nvarchar | YES |
| EtiquetaNeumatico | nvarchar | YES |
| FechaInstalacion | datetime | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
