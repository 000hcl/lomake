const joryMap = {
  'hy-ttdk-tuk-jory': '100-K001',
  'hy-ttdk-tum-jory': '100-M001',
  'hy-oiktdk-on-jory': '200-K001',
  'hy-oiktdk-otm-jory': '200-M001',
  'hy-oiktdk-ibl-jory': '200-M002',
  'hy-oiktdk-ggl-jory': '200-M003',
  'hy-ltdk-psyk-jory': ['300-K001', '300-M004'],
  'hy-ltdk-logo-jory': ['300-K002', '300-M005'],
  'hy-ltdk-ll-jory': '300-M001',
  'hy-ltdk-tmed-jory': '300-M002',
  'hy-ltdk-hll-jory': '300-M003',
  'hy-humtdk-filk-jory': '400-K001',
  'hy-humtdk--jory': '400-K002',
  'hy-humtdk-kik-jory': '400-K003',
  'hy-humtdk-kok-jory': '400-K004',
  'hy-humtdk-kuka-jory': '400-K005',
  'hy-humtdk-hisk-jory': '400-K006',
  'hy-humtdk-ttm-jory': '400-M001',
  'hy-humtdk-kim-jory': '400-M002',
  'hy-humtdk-eng-jory': '400-M003',
  'hy-humtdk-rus-jory': '400-M004',
  'hy-humtdk-lingdig-jory': '400-M005',
  'hy-humtdk-tra-jory': '400-M006',
  'hy-humtdk-suku-jory': '400-M007',
  'hy-humtdk-nor-jory': '400-M008',
  'hy-humtdk-kir-jory': '400-M009',
  'hy-humtdk-kuma-jory': '400-M010',
  'hy-humtdk-ice-jory': '400-M011',
  'hy-humtdk-alku-jory': '400-M012',
  'hy-humtdk-spt-jory': '400-M014',
  'hy-humtdk-hism-jory': '400-M015',
  'hy-mltdk-mat-jory': '500-K001',
  'hy-mltdk-fys-jory': '500-K002',
  'hy-mltdk-kemk-jory': '500-K003',
  'hy-mltdk-mfkk-jory': '500-K004',
  'hy-mltdk-tkt-jory': '500-K005',
  'hy-mltdk-geok-jory': '500-K006',
  'hy-mltdk-maa-jory': '500-K007',
  'hy-mltdk-bsc-jory': '500-K008',
  'hy-mltdk-mast-jory': '500-M001',
  'hy-mltdk-lsi-jory': '500-M002',
  'hy-mltdk-tcm-jory': '500-M003',
  'hy-mltdk-paras-jory': '500-M004',
  'hy-mltdk-matres-jory': '500-M005',
  'hy-mltdk-atm-jory': '500-M006',
  'hy-mltdk-kem-jory': '500-M007',
  'hy-mltdk-mfkm-jory': '500-M008',
  'hy-mltdk-csm-jory': '500-M009',
  'hy-mltdk-data-jory': '500-M010',
  'hy-mltdk-geom-jory': '500-M011',
  'hy-mltdk-geog-jory': '500-M012',
  'hy-mltdk-usp-jory': '500-M013',
  'hy-ftdk-farm-jory': '550-K001',
  'hy-ftdk-prov-jory': '550-M001',
  'hy-ftdk-mpharm-jory': '550-M002',
  'hy-bytdk-bio-jory': '570-K001',
  'hy-bytdk-mole-jory': '570-K002',
  'hy-bytdk-env-jory': '570-K003',
  'hy-bytdk-eeb-jory': '570-M001',
  'hy-bytdk-ips-jory': '570-M002',
  'hy-bytdk-gmb-jory': '570-M003',
  'hy-bytdk-neuro-jory': '570-M004',
  'hy-bytdk-ecgs-jory': '570-M005',
  'hy-ktdk-eduk-jory': '600-K001',
  'hy-ktdk-edum-jory': '600-M001',
  'hy-ktdk-ce-jory': '600-M002',
  'hy-valttdk-pvk-jory': '700-K001',
  'hy-valttdk-yk-jory': '700-K002',
  'hy-valttdk-sosk-jory': '700-K003',
  'hy-mmtdk-ecok-jory': '700-K004',
  'hy-valttdk-film-jory': '700-M001',
  'hy-valttdk-pvm-jory': '700-M002',
  'hy-valttdk-gpc-jory': '700-M003',
  'hy-valttdk-ym-jory': '700-M004',
  'hy-valttdk-cos-jory': '700-M005',
  'hy-valttdk-ens-jory': '700-M006',
  'hy-valttdk-msv-jory': '700-M007',
  'hy-valttdk-sosm-jory': '700-M008',
  'hy-valttdk-econ-jory': '700-M009',
  'hy-valttdk-sote-jory': '700-M011',
  'hy-sskh-ksv-jory': '740-K001',
  'hy-mmtdk-maatk-jory': '800-K001',
  'hy-mmtdk-metsak-jory': '800-K002',
  'hy-mmtdk-etk-jory': '800-K003',
  'hy-mmtdk-yet-jory': '800-K004',
  'hy-mmtdk-agri-jory': '800-M001',
  'hy-mmtdk-agere-jory': '800-M002',
  'hy-mmtdk-for-jory': '800-M003',
  'hy-mmtdk-food-jory': '800-M004',
  'hy-mmtdk-hnfb-jory': '800-M005',
  'hy-mmtdk-ekm-jory': '800-M006',
  'hy-mmtdk-mmb-jory': '800-M007',
  'hy-eltdk-elk-jory': '900-K001',
  'hy-eltdk-ell-jory': '900-M001',
  'hy-dp-dptheol-jory': 'T920101',
  'hy-dp-dplaw-jory': 'T920102',
  'hy-dp-philartsoc-jory': 'T920103',
  'hy-dp-dphistcult-jory': 'T920104',
  'hy-dp-dplang-jory': 'T920105',
  'hy-dp-sky-jory': 'T920106',
  'hy-dp-dpsocs-jory': 'T920107',
  'hy-dp-pyam-jory': 'T920108',
  'hy-dp-dpe-jory': 'T920109',
  'hy-dp-seduce-jory': 'T920110',
  'hy-dp-clic-jory': 'T920111',
  'hy-dp-dpbm-jory': 'T921101',
  'hy-dp-klto-jory': 'T921102',
  'hy-dp-docpop-jory': 'T921103',
  'hy-dp-findos-jory': 'T921104',
  'hy-dp-dpdr-jory': 'T921105',
  'hy-dp-ils-jory': 'T921106',
  'hy-dp-bandm-jory': 'T921107',
  'hy-dp-cvm-jory': 'T921108',
  'hy-dp-dphub-jory': 'T921109',
  'hy-dp-luova-jory': 'T922101',
  'hy-dp-dpps-jory': 'T922102',
  'hy-dp-denvi-jory': 'T922103',
  'hy-dp-agforee-jory': 'T922104',
  'hy-dp-mbdp-jory': 'T922105',
  'hy-dp-foodhealth-jory': 'T922106',
  'hy-dp-papu-jory': 'T923101',
  'hy-dp-geodoc-jory': 'T923102',
  'hy-dp-atm-dp-jory': 'T923103',
  'hy-dp-chems-jory': 'T923104',
  'hy-dp-domast-jory': 'T923105',
  'hy-dp-matrena-jory': 'T923106',
  'hy-dp-docs-jory': 'T923107',
}

const doctoralProgrammeCodes = [
  'T920101',
  'T920102',
  'T920103',
  'T920104',
  'T920105',
  'T920106',
  'T920107',
  'T920108',
  'T920109',
  'T920110',
  'T920111',
  'T921101',
  'T921102',
  'T921103',
  'T921104',
  'T921105',
  'T921106',
  'T921107',
  'T921108',
  'T921109',
  'T922101',
  'T922102',
  'T922103',
  'T922104',
  'T922105',
  'T922106',
  'T923101',
  'T923102',
  'T923103',
  'T923104',
  'T923105',
  'T923106',
  'T923107',
]

const kojot = [
  'hy-ttdk-kandi-kojot',
  'hy-ttdk-maisteri-kojot',
  'hy-bytdk-kandi-kojot',
  'hy-bytdk-maisteri-kojot',
  'hy-ftdk-kandi-kojot',
  'hy-ftdk-maisteri-kojot',
  'hy-humtdk-kandi-kojot',
  'hy-humtdk-maisteri-kojot',
  'hy-ktdk-kandi-kojot',
  'hy-ktdk-maisteri-kojot',
  'hy-ltdk-maisteri-kojot',
  'hy-mltdk-kandi-kojot',
  'hy-mltdk-maisteri-kojot',
  'hy-oiktdk-kandi-kojot',
  'hy-oiktdk-maisteri-kojot',
  'hy-valttdk-kandi-kojot',
  'hy-valttdk-maisteri-kojot',
  'hy-eltdk-kandi-kojot',
  'hy-eltdk-maisteri-kojot',
  'hy-sskh-kandi-kojot',
  'hy-tohtoriohjelma-johtaja',
]

const facultyMap = {
  'hy-ttdk-dekanaatti': 'H10',
  'hy-oiktdk-dekanaatti': 'H20',
  'hy-ltdk-dekanaatti': 'H30',
  'hy-humtdk-dekanaatti': 'H40',
  'hy-mltdk-dekanaatti': 'H50',
  'hy-ftdk-dekanaatti': 'H55',
  'hy-bytdk-dekanaatti': 'H57',
  'hy-ktdk-dekanaatti': 'H60',
  'hy-valttdk-dekanaatti': 'H70',
  'hy-sskh-rehtoraatti': 'H74',
  'hy-mmtdk-dekanaatti': 'H80',
  'hy-eltdk-dekanaatti': 'H90',
}

const doctoralIams = [
  'hy-tohtorikoulutus-johtoryhma',
  'hy-tine'
]

const doctoralSchoolMap = {
  'hy-tutkijakoulut-hymy-jory': [
    'T920101',
    'T920102',
    'T920103',
    'T920104',
    'T920105',
    'T920106',
    'T920107',
    'T920108',
    'T920109',
    'T920110',
    'T920111',
  ],
  'hy-tutkijakoulut-dshealth-jory': ['T921101', 'T921102', 'T921103', 'T921104', 'T921105', 'T921106', 'T921107', 'T921108'],
  'hy-tutkijakoulut-yeb-jory': ['T922101', 'T922102', 'T922103', 'T922104', 'T922105', 'T922106'],
  'hy-tutkijakoulut-donasci-jory': ['T923101', 'T923102', 'T923103', 'T923104', 'T923105', 'T923106', 'T923107'],
}

const iamToOrganisationCode = iam => {
  const organisationCodes = joryMap[iam]
  if (Array.isArray(organisationCodes)) {
    return organisationCodes
  } else
    return [organisationCodes]
}

const iamToFacultyCode = iam => facultyMap[iam]

const isDoctoralIam = iam => doctoralIams.includes(iam)

const isUniversityWideIam = iam => ['hy-ypa-opa-opintoasiainpaallikot', 'hy-rehtoraatti'].includes(iam)

/**
 * 
 * @param {*} iam 
 * @returns {string[]}
 */
const iamToDoctoralSchool = iam => doctoralSchoolMap[iam]

module.exports = { iamToOrganisationCode, iamToFacultyCode, isDoctoralIam, isUniversityWideIam, doctoralProgrammeCodes, iamToDoctoralSchool }
