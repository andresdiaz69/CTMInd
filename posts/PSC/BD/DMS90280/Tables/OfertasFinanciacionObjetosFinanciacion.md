# Table: OfertasFinanciacionObjetosFinanciacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PKFKAñoOfertasFinanciacion | nvarchar | NO |
| PkFKSeries_OfertasFinanciacion | nvarchar | NO |
| PkFKNumOfertasFinanciacion | int | NO |
| PKOfertasFinanciacionObjetosFinanciacion_Iden | smallint | NO |
| FkVehiculos | int | YES |
| FkEmpresas_OfertaVN | smallint | YES |
| FkCentros_OfertaVN | smallint | YES |
| FkTerceros_OfertaVN | int | YES |
| FkClientesPotEntradas_OfertaVN | smallint | YES |
| FkOfertas_VN | smallint | YES |
| FkEmpresas_OfertaVO | smallint | YES |
| FkCentros_OfertaVO | smallint | YES |
| FkTerceros_OfertaVO | int | YES |
| FkClientesPotEntradas_OfertaVO | smallint | YES |
| FkOfertasVO | smallint | YES |
| FkEmpresas_PresupuestoTA | smallint | YES |
| FkCentros_PresupuestoTA | smallint | YES |
| FKAñoPresupuesto_TA | nvarchar | YES |
| FKSeries_PresupuestoTA | nvarchar | YES |
| FkNumPresupuesto_TA | int | YES |
| FkEmpresas_PresupuestoRE | smallint | YES |
| FKAñoPresupuesto_RE | nvarchar | YES |
| FKSeries_PresupuestoRE | nvarchar | YES |
| FkNumPresupuesto_RE | int | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
